function placeOrderCallback(item, callback) {
    console.log(`Order placed: ${item}`);

    setTimeout(() => {
        callback(item);
    }, 2000);
}

function trackOrderCallback(item, callback) {
    console.log(`Tracking order: ${item}`);

    setTimeout(() => {
        callback(item);
    }, 2000);
}

function confirmDeliveryCallback(item, callback) {
    console.log(`Confirming delivery: ${item}`);

    setTimeout(() => {
        callback(`${item} delivered successfully!`);
    }, 2000);
}


// Callback nesting
placeOrderCallback("Pizza", (item) => {

    trackOrderCallback(item, (item) => {

        confirmDeliveryCallback(item, (message) => {

            console.log(message);

        });

    });

});