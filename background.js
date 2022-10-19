function addBookmark(currentBookmark, bookmarkObject) {
    if (currentBookmark) {
        console.log("bookmark already exists, not adding");
    } else {
        browser.bookmarks.create(bookmarkObject);
    }
}

function installBookmarkURL(bookmarkObject) {
    let searchObject = {
        title: bookmarkObject.title
    };
    let searching = browser.bookmarks.search(searchObject);
    searching.then(bookmarks => {
        addBookmark(bookmarks[0], bookmarkObject);
    }, error => {
        addBookmark(null, bookmarkObject);
    });
}

function installExtensionsFromJson() {
    let myRequest = browser.runtime.getURL("bookmarks.json");
    fetch(myRequest)
        .then(response => {
            let text = response.text();
            text.then(json => {
                let data = JSON.parse(json);
                let searching = browser.bookmarks.search({
                    title: data.Directory
                });
                searching.then(bookmarks => {
                    if (bookmarks[0] === undefined) {
                        let btn = browser.bookmarks.create({
                            title: data.Directory
                        });
                        btn.then(node => {
                            for (let key in data.bookmarks) {
                                if (data.bookmarks[key].title !== undefined) {
                                    data.bookmarks[key].parentId = node.id;
                                    installBookmarkURL(data.bookmarks[key]);
                                }
                            }
                        });
                    } else {
                        for (let key in data.bookmarks) {
                            if (data.bookmarks[key].title !== undefined) {
                                data.bookmarks[key].parentId = bookmarks[0].id;
                                installBookmarkURL(data.bookmarks[key]);
                            }
                        }
                    }
                }, error => {
                    let btn = browser.bookmarks.create({
                        title: data.Directory
                    });
                    btn.then(node => {
                        for (let key in data.bookmarks) {
                            if (data.bookmarks[key].title !== undefined) {
                                data.bookmarks[key].parentId = node.id;
                                installBookmarkURL(data.bookmarks[key]);
                            }
                        }
                    });
                });
            });
        });
}

function unInstallExtensionsFromJson() {
    let myRequest = browser.runtime.getURL("bookmarks.json");
    fetch(myRequest)
        .then(response => {
            console.log();
            let text = response.text();
            text.then(json => {
                let data = JSON.parse(json);
                let searching = browser.bookmarks.search({
                    title: data.Directory
                });
                searching.then(bookmarks => {
                    if (bookmarks[0] !== undefined) {
                        browser.bookmarks.removeTree(bookmarks[0].id);
                    }
                }, error => {
                    console.log(error);
                });
            });
        });
}

// update when the extension loads initially
installExtensionsFromJson();
browser.management.onUninstalled.addListener(info => {
    console.log("removing extensions installed by", info);
    unInstallExtensionsFromJson();
});