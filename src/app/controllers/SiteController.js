class SiteController {
    //[GET] home index
    index(req, res){
        res.render('home');
    }
}

export default new SiteController();