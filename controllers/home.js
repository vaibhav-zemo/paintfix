module.exports.home = async function (req,res) {
    try {
        if (req.isAuthenticated()) {
            return res.render('home',{
                title: "PaintFix",
            });
        }
        return res.render('sign_in', {
            title: 'Sign In'
        })
    } catch (error) {
        console.log("Error in home Controller",error);
        return;
    }
}