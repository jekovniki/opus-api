
export async function postSignIn(request: Record<string, any>, response: Record<string, any>): Promise<void> {
    try {
        console.log(response);

        response.json(response);

    } catch(error) {
        console.error(error);
        response.json({
            success: false
        })
    }
}