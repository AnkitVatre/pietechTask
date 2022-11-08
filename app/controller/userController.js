const { apiResponse, pagination } = require("../helpers")
const { userModel } = require("../models")

exports.userSignUp = [
   async  (req, res) => {
        try {
            const data = new userModel(req.body)
            const result = await data.save()
            if(!result) return apiResponse.errorResponse(res, "Something went wrong")
            return apiResponse.successResponseWithData(res,"User successfully signup",  result)
        } catch (error) {
            return apiResponse.errorResponse(res, error.message)
        }
    }
]

exports.userSignIn = [
    async (req, res) => {
        try {
            const result = await userModel.findOne({email:req.body.email, password:req.body.password})
            if(!result) return apiResponse.notFoundResponse(res, "User credentials do not match")
            return apiResponse.successResponse(res, "User successfully signed in")
        } catch (error) {
            return apiResponse.errorResponse(res, error.message)
        }
    }
]

exports.userList = [
    async(req,res) => {
        try {
            const filter = [{}]
            if(req.body.searchKey){
                filter.push(
                    {$or:[
                        {name:{$regex:req.body.searchKey, $options:"i"}}
                    ]}
                )
            }
            const query = [
                {$match:{$and:filter}},
                {$project:{
                    name:1,
                    email:1,
                    age:1
                }}
            ]
            console.log(req.body)
            const {limit, page, offset, field, sort} = pagination.getPaginationData(req.body.limit, req.body.page, req.body.sorting)
            // const result = await userModel.find(query, {name:1, email:1, age:1}).sort({[field]:sort}).skip(offset).limit(limit)
            const result = await userModel.aggregate(query).sort({[field]:sort}).skip(offset).limit(limit)
            if(!result) return apiResponse.errorResponse(res, "Something went wrong")
            let data = await pagination.applyPagination(userModel, [query[0]],limit, page, offset, field, sort, result)
            return apiResponse.successResponseWithData(res, "User List", data )
        } catch (error) {
            return apiResponse.errorResponse(res, error.message)
        }
    }
]
