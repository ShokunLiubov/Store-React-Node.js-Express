import AuthError from "../exception/authError";
export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof AuthError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Unexpected error" });
}
