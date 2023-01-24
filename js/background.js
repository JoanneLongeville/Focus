//Stocke le nombre limite d'onglets ouverts dans la variable limitTab.
let limitTab = 20;

//Lorsque l'utilisateur sélectionne son nombre limite d'onglets ouverts on le reçoit...
chrome.runtime.onMessage.addListener((data)=>{
    //... et on le stocke dans la variable limitTab...
    limitTab = data;
    // ...et on envoie la variable limitTab.
    (chrome.runtime.sendMessage(limitTab));
});

//Quand on ouvre un onglet...
chrome.tabs.onCreated.addListener(async (tab) =>{
    //... on stocke les données de la fenêtre active dans la constante tabs.
    const tabs = await chrome.tabs.query({ currentWindow: true });
    //... si le nombre d'onglets ouverts -1 est supérieur ou égal au nombre d'onglets limite...
    if (tabs.length-1 >= limitTab) {
            //... alors l'icône est rouge...
            await chrome.action.setIcon({ path: "/img/dont.png" })
            //... et l'onglet ouvert est supprimé...
            .then(chrome.tabs.remove(tab.id))
            //... et une notif est créée.
            .then(chrome.notifications.create("notificationGyro", {
            type: 'basic',
            iconUrl: "https://emoji.slack-edge.com/TFLNG6MFU/siren-rouge/888706785cc75a75.gif",
            title: "Faites le tri !",
            message: "Vous avez déjà atteint votre limite de " + limitTab +" onglets ouverts.",
            priority:2}))
    } else {
        //... sinon l'icône est verte.
        await chrome.action.setIcon({ path: "/img/do.png" });
    };
});

//Quand on ferme un onglet...
chrome.tabs.onRemoved.addListener(async () => {
    //... on stocke données de la fenêtre active dans la constante tabs.
    const tabs = await chrome.tabs.query({ currentWindow: true });
    //... si le nombre d'onglets ouverts est supérieur ou égal au nombre d'onglet limite...
    if (tabs.length >= limitTab) {
        //... alors l'icône est rouge.
        await chrome.action.setIcon({ path: "/img/dont.png" });
    } else {
        //... sinon l'icône est verte...
        await chrome.action.setIcon({ path: "/img/do.png" })
        // ... et la notif est supprimée. 
        .then(chrome.notifications.clear(
            "notificationGyro"
        ));
    };
});



