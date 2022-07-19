import {getDb} from "../mongo-config";

/**
 *
 * @param userSub
 */
async function getUser(userSub:string) {
    try {
        let db = await getDb();

        let user = await db.collection("users")
            .find({ user_id: userSub })
            .toArray();

        if (user.length === 1){
            console.log('this is the user: ',user)
            return user
        }else {
            let user = {
                'user_id': userSub,
                "date_created": Date.now()
            };

            db.collection("users")
                .insertOne(user, function(err: any, res: any) {
                    if (err) throw err;
                });
            return user
        }
    } catch (e) {
        console.error(e);
        return "error";
    }
}


module.exports = {
    getUser,
}