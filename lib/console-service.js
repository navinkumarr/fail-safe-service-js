module.exports = class ConsoleService {
    connect(online, offline){
        setTimeout(() => {
            online();
        }, 2000);
        return this;
    }

    send(data, offline) {
        setTimeout(() => {
            if (Math.floor(Math.random() * 100) <= 30) {
                offline();
            } else {
                console.log(data);
            }
        }, 100);
    }
};
