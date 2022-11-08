


exports.getPaginationData = (limit, page, sorting) => {
    limit = limit || 10;
    page = page || 0
    sorting = sorting ? sorting.split("|") : ['createdAt', 'desc']
    field = sorting[0]
    sort = (sorting[1] == "desc") ? -1 : 1
    offset = page * limit
    return {limit, page, offset, field, sort}
}

exports.applyPagination = async (collectionName, query, limit, page, offset, field, sort, result) => {
    const count = await collectionName.aggregate(query)
    let isNext 
    if((count.length <= offset) || result.length < limit ){
        isNext = false
    }
    else {
        isNext =true
    }
    let data = {
        totalRecord : count.length,
        totalPage: Math.ceil(count.length / limit) ,
        page, 
        limit, 
        isNext, 
        searchData : result
    }
    return data
}