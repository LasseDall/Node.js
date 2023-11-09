function myPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve("Something good");
            } catch {
                reject("Something bad");
            }}, 2000);
    });
}

function myFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve({ data: "Super fetch"});
            } catch {
                reject({ message: "Something went wrong!" });
            }}, 2000);
    });
}

myFetch()
.then((result) => console.log(result.data))
.catch((message) => console.log(message));

//IIFE
(async function main() {
    try {
        const response = await myFetch();
        console.log(response.data);
    } catch(error) {
        console.log(error.message);
    }
})();


async function handleAllPromises() {
    const results = await Promise.all([myFetch(), myPromise()]);
    console.log(results)
}

handleAllPromises();

