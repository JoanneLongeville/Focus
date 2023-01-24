//Stocke le nombre limite d'onglets ouverts dans la variable limitTab.
let limitTab = 20;

//Stocke les données de la fenêtre active dans la variable tabs.
let tabs = await chrome.tabs.query({ currentWindow: true });

//Réception de la variable limitTab.
chrome.runtime.onMessage.addListener((datas)=>{
    limitTab = datas;
});

//Met au singulier ou au pluriel selon le nombre d'onglets ouverts.
if (tabs.length ==1 ){
    document.getElementsByName('tabNumber')[0].textContent = "Vous avez "+ tabs.length +" onglet ouvert";
} else {
    document.getElementsByName('tabNumber')[0].textContent = "Vous avez "+ tabs.length +" onglets ouverts";
};

//Stocke les valeurs de l'input dans la variable inputValue. 
let inputValue = document.getElementById("limit").addEventListener("input", () => console.log(document.getElementById("limit").value));

//Stocke l'id btn du HTML dans la variable bouton.
let bouton = document.getElementById("btn");



//Lorsque l'on clique sur le bouton...
bouton.addEventListener('click', event => {
    //... le nombre d'onglets ouverts limite apparait sur le bouton.
    bouton.innerHTML = "Votre limite : " + (document.getElementById("limit").value) + " onglets";
    //... si le nombre d'onglets ouverts est inférieur ou égal au nombre d'onglets limite...
    if(tabs.length <= limitTab){
        //... alors l'arrière plan de la popup est verte.
        document.body.style.background = 'rgba(0, 174, 20, 0.466)';
    } else {
        //... sinon l'arrière plan de la popup est rouge.
        document.body.style.background = 'rgba(175, 0, 0, 0.466)';
    };
    //... et on envoie la valeur de l'input selectionnée.
    chrome.runtime.sendMessage(document.getElementById("limit").value);
});


