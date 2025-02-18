class NewsController {
    //[GET] index
    index(req, res){
        res.render('news');
    }
    //[GET] show details
    show(req, res){
        res.send('Test Details');
    }
}

export default new NewsController();