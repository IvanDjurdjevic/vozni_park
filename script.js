"use strict";

let form = document.querySelector("form");
let autoPark = []; //Postavljen niz u koji treba da se ubacuju objekti
let autoObj = {}; //Postavljen objekat
let autoPark2 = []; 
let autoObj2 = {}; 
let autoPark3 = []; 
let autoObj3 = {}; 
let tabela = document.querySelector("#tabela");
let tabela2 = document.querySelector("#tabela2");
let tabela3 = document.querySelector("#tabela3");

form.addEventListener("submit", function (e) {
    e.preventDefault(); //Sprečava difolt akciju u ovom slučaju submit

    // this omogućava u ovom slučaju da skopuje formu
    let tablica = this.querySelector("[name='tablica']").value;
    let marka = this.querySelector("[name='marka']").value;
    let godiste = this.querySelector("[name='godiste']").value;
    let kilometraza = this.querySelector("[name='kilometraza']").value;
    //let autoElement = document.createElement("tr"); // kreiranje div elementa za ispis objekta na stranicu
    
    //Uslov za format tablice
    let ispravnaTablica1 = /[A-Z,Đ,Š,Ž,Ć,Č]{2}-[0-9]{3,4}-[A-Z,Đ,Š,Ž,Ć,Č]{2}$/;
    let ispravnaTablica2 = /[A-Z,Đ,Š,Ž,Ć,Č]{2}-[0-9,A-Z,Đ,Š,Ž,Ć,Č]{3,5}$/;
    let ispravnaTablica = (ispravnaTablica1.test(tablica) || ispravnaTablica2.test(tablica));
    //Uslov za format i raspon godine
    let ispravnoGodiste1 = /[1][8][8][4-9]$/;
    let ispravnoGodiste2 = /[1][8][9][0-9]$/;
    let ispravnoGodiste3 = /[1][9][0-9]{2}$/;
    let ispravnoGodiste4 = /[2][0][0,1][0-9]$/;
    let ispravnoGodiste5 = /[2][0][2][0-3]$/;
    let uslovGodiste = (
        ispravnoGodiste1.test(godiste) ||
        ispravnoGodiste2.test(godiste) ||
        ispravnoGodiste3.test(godiste) ||
        ispravnoGodiste4.test(godiste) ||
        ispravnoGodiste5.test(godiste)
    );

    //Provera ukoliko oznaka tablice nije ispravna
    if (!ispravnaTablica && tablica !== "") {
        alert(`Pogrešno ste uneli oznaku tablice!\nUneli ste: ${tablica}\nPrimer pravilnog unosa: NS-123-ŽG ili BĐ-1234-NS`);
    }
    //Provera ukoliko format i raspon godine nije ispravan
    if (!uslovGodiste && godiste !== "") {
        alert(`Pogrešno ste uneli godište automobila!\nUneli ste: ${godiste}\nPrimer pravilnog unosa i raspona godina: 1884 do 2023`);
    }
    //Provera da li je kilometraža manja od nule
    if (kilometraza < 0) {
        alert(`Pogrešno je uneta kilometraža, jer je ${kilometraza} negativan broj.`);
    }
    //Uslov onemogućava unos "praznih polja" u objekat, kao i u kombinaciji kada su pravilno upisane oznake
    //tablice ili godište, a marka nije ili samo jedan pravilan unos oznaka tablice ili godina, a ostala dva nisu.
    if (tablica !== "" && marka !== "" && godiste !== "" && ispravnaTablica && uslovGodiste && kilometraza) {
        let vozniParkObj = {
            'registarska_tablica': tablica,
            'marka': marka,
            'godiste': godiste,
            'kilometraza': kilometraza
        };
        let vozniParkObj2 = {
            'registarska_tablica': tablica,
            'marka': marka,
            'godiste': godiste,
            'kilometraza': kilometraza
        };
        let vozniParkObj3 = {
            'registarska_tablica': tablica,
            'marka': marka,
            'godiste': godiste,
            'kilometraza': kilometraza
        };
        autoObj = vozniParkObj;
        autoObj2 = vozniParkObj2;
        autoObj3 = vozniParkObj3;
        //>>>Dodato ukoliko se unesu vrednosti za objekat koji vec postoji u nizu<<<
        if (autoPark.some(e => e.marka === autoObj.marka && e.godiste === autoObj.godiste && e.registarska_tablica === autoObj.registarska_tablica && e.kilometraza === autoObj.kilometraza)){
            alert(`Auto koji ste uneli vec POSTOJI u voznom parku!`);
            return;
        }
        //>>>Dodato vise logicki, posto je registarska oznaka sama po sebi jedinstvena, ne sme da postoji ista takva (osim falsifikata). U svakom slucaju ne moze da skodi...<<<
        if (autoPark.some(e => e.registarska_tablica === autoObj.registarska_tablica)){
            alert(`U voznom parku vec POSTOJI automobil sa registarskom oznakom koju ste upravo uneli!`);
            return;
        }
        // Pushovanje objekta u niz
        else{if (kilometraza < 5000) {
            autoPark.push(vozniParkObj);
        }
        else if (kilometraza > 15000) {
            autoPark3.push(vozniParkObj3);
        }
        else if (kilometraza >= 5000 || kilometraza <= 15000) {
            autoPark2.push(vozniParkObj2);
        }
   
        }
        
        let a=''
        for (let i = 0; i < autoPark.length; i++) {
            let k ='';
             a+= `
             <tr id=k>
                <td>${i + 1}</td>
                <td>${autoPark[i]['registarska_tablica']}</td>
                <td>${autoPark[i]['marka']}</td>
                <td>${autoPark[i]['godiste']}</td>
                <td>${autoPark[i]['kilometraza']}</td>
                <td><button id="obrisiT1_${i+1}" onclick='autoPark.splice(k, 1); parentNode.parentNode.remove()'>Obrisi</button></td>
                </tr>
            `;
        }

        let a2=''
        for (let i = 0; i < autoPark2.length; i++) {
            let k ='';
             a2+= `
             <tr id=k>
                <td>${i + 1}</td>
                <td>${autoPark2[i]['registarska_tablica']}</td>
                <td>${autoPark2[i]['marka']}</td>
                <td>${autoPark2[i]['godiste']}</td>
                <td>${autoPark2[i]['kilometraza']}</td>
                <td><button id="obrisiT2_${i+1}" onclick='autoPark.splice(k, 1); parentNode.parentNode.remove()'>Obrisi</button></td>
                </tr>
            `;
        }

        let a3=''
        for (let i = 0; i < autoPark3.length; i++) {
            let k ='';
             a3+= `
             <tr id=k>
                <td>${i + 1}</td>
                <td>${autoPark3[i]['registarska_tablica']}</td>
                <td>${autoPark3[i]['marka']}</td>
                <td>${autoPark3[i]['godiste']}</td>
                <td>${autoPark3[i]['kilometraza']}</td>
                <td><button id="obrisiT3_${i+1}" onclick='autoPark.splice(k, 1); parentNode.parentNode.remove()'>Obrisi</button></td>
                </tr>
            `; // id za svaku tabelu je razlicit (obrisi, obrisii, obrisiii)
        }

        if (kilometraza < 5000) {
            tabela.innerHTML=a
        }
        else if (kilometraza > 15000) {
            tabela3.innerHTML=a3;
        }
        else if (kilometraza >= 5000 || kilometraza <= 15000) {
            tabela2.innerHTML=a2;
        }


        

        //Prilikom izlaska iz petlje izvršavaju se sledeće tri linije koda kojima se čiste box-ovi sva tri inputa na stranici. Čisto user expirience, budući da se unose vozila u vozni park (više ih je).
        this.querySelector("[name='tablica']").value = "";
        this.querySelector("[name='marka']").value = "";
        this.querySelector("[name='godiste']").value = "";
        this.querySelector("[name='kilometraza']").value = "";

    }
    //Provera ukoliko su pojedina polja nepopunjena (ili sva polja), izlazi alert obaveštenje.
    if (tablica == "" || marka == "" || godiste == "" || kilometraza == "") {
        alert("Sva polja MORAJU biti popunjena!");
    }
    //console.log(autoObj);
    console.log(autoPark); //Provere radi, čisto da se vidi da je reč o nizu objekata koji se sa svakim unosom dopunjuje.
});

//Ne postoji provera za unos marke automobila, može se uneti bilo šta.


