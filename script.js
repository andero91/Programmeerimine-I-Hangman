// Arvatav sõna
let sõna = 'AVOKAADO';

// Kohatäidetega sõna, mis kasutajale kuvatakse
let kohatäide = '_';
let kohatäidetega_sõna = kohatäide.repeat(sõna.length);

// Kohatäidetega sõna kuvamine
console.log(kohatäidetega_sõna);

// Elude muutuja algväärtustamine
elud = 7;

// Juhusliku arvu genereerimise klass
class Random {
    static Range(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// 20-tahulise täringu veeretamine
// Allikas: õppejõu materjal
// Täringu klass
class Dice {
    #sides;

    constructor(sides) {
        this.#sides = sides;
    }

    static D20() {
        return new Dice(20);
    }

    describe() {
        return `D${this.#sides}`;
    }

    roll() {
        return Random.Range(1, this.#sides);
    }
}

// Täringu tulemuse kuvamise klass
class DicePrinter {
    static print(dice, roll) {
        let text = `${dice.describe()} täringu tulemus on ${roll}. `;

        // Lisa mängijale elu juurde
        if (roll === 20) {
            text += "Saad ühe elu juurde.";
            elud += 1;
        }

        // Mäng on läbi
        if (roll === 1) {
            text += "Mäng on läbi.";
        }

        console.log(text);
    }
}

let d20 = new Dice(20);
let d20_roll = d20.roll();

DicePrinter.print(d20, d20_roll);

// 10-tahulise täringu veeretamine
// Täringu klass
class Dice10 {
    #sides;

    constructor(sides) {
        this.#sides = sides;
    }

    static D10() {
        return new Dice10(10);
    }

    roll() {
        return Random.Range(1, this.#sides);
    }

    // Juhuslik arv vahemikus 0-9
    // Kui 0, siis 10
    // Tulemus korrutatakse 10-ga
    roll() {
        let d10_random = 0;
        d10_random = Random.Range(0, this.#sides - 1);
        if (d10_random === 0) {
            return d10_random = 100;
        }
        return d10_random = d10_random * 10;
    }
}

// Täringu tulemuse kuvamise klass
class Dice10Printer {
    static print(dice, roll) {
        let text = `D% täringu veeretus on ${d10_roll}. `;

        console.log(text);
    }
}

let d10 = new Dice10(10);
let d10_roll = d10.roll();

// Esialgse veeretuse kuvamine
Dice10Printer.print(d10, d10_roll);
// Kahega jagatud tulemus
let d10_tulemus = d10_roll / 2;
// Kahega jagatud tulemuse kuvamine
console.log("Seega D% täringu tulemus on " + d10_tulemus + ".");

// Avatavate tähtede arvu arvutamine
let avatavad_tähed_komakohaga = d10_tulemus / 100 * sõna.length;
// Ümardamine allapoole täisarvuni
let avatavad_tähed_täisarv = Math.floor(avatavad_tähed_komakohaga);

console.log("Äraarvatavas sõnas on " + sõna.length + " tähte.");
console.log(d10_tulemus + "% " + sõna.length + "-st on " + avatavad_tähed_komakohaga + ", seega kasutajale avatakse " + avatavad_tähed_täisarv + " täht(e).");

// Millised tähed avatakse sõnast?
// Tsükkel jookseb avatavad_tähed_täisarv korda
// Valitakse juhuslik indeks
// Genereerin nii palju juhuslikke arve, kui kasutajale avatakse, vahemikus 0 kuni sõna pikkus
if (avatavad_tähed_täisarv === 0) {
    // Kui avatakse 0 tähte, siis on järjend tühi.
    juhuslikud_arvud = [];
} else { 
for (i = 0; i < avatavad_tähed_täisarv; i++) {
    juhuslikud_arvud = [];
    while (juhuslikud_arvud.length < avatavad_tähed_täisarv) {
        // Juhuslik arv on vahemikus 0 kuni sõna pikkus
        let võimalik_arv = Random.Range(0, sõna.length - 1);
        // Kui võimalikku arvu juba juhuslike arvude järjendis ei ole, siis lisa see arv järjendisse
        if (juhuslikud_arvud.indexOf(võimalik_arv) === -1) {
            juhuslikud_arvud.push(võimalik_arv);
        }
    }
}
}

// Loon järjendi avatavate tähtede jaoks
avatavad_tähed = [];
let avatava_tähe_indeks = 0;
// Tsükkel käib läbi juhuslike arvude järjendi ja leiab vastava tähe sõnast.
// Lisab leitud tähe avatavate tähtede jörjendisse
for (i = 0; i < juhuslikud_arvud.length; i++) {
    avatava_tähe_indeks = juhuslikud_arvud[i];
    avatavad_tähed.push(sõna[avatava_tähe_indeks]);
}

// Kuvan sõna koos avatud tähtedega
// Funktsioon stringis kindla indeksi asendamiseks. Allikas: https://www.w3docs.com/snippets/javascript/how-to-replace-a-character-at-a-particular-index-in-javascript.html
String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
  }
// Asendan kohatäite varasemalt juhuslikult valitud indeksi(te)s vastava õige tähega.
for (i = 0; i < juhuslikud_arvud.length; i++) {
    kohatäidetega_sõna = kohatäidetega_sõna.replaceAt(juhuslikud_arvud[i], avatavad_tähed[i]);
}

console.log(kohatäidetega_sõna);

// Kuvab HTML-is kohatäidetega sõna
function kuvakohatäidetegaSõna() {
    document.getElementById("hangman").innerHTML = kohatäidetega_sõna;
}

// Kui HTML-is klõpsatakse nupule, loeb funktsioon HTML-i inputi sisestatud tähe
// Kui täht leidub sõnas, siis täiendab kohatäidetega sõna
// Ei toimi
function katse() {
    let sisestatav_täht = document.getElementsByClassName("sisestuskast")[0].value;
    for (i = 0; i < sõna.length - 1; i++) {
        if (sõna[i] === sisestatav_täht) {
            kohatäidetega_sõna = kohatäidetega_sõna.replaceAt(sõna[i], sisestatav_täht);
        }
    }
    console.log(kohatäidetega_sõna);
}

console.log("Kasutajal on " + elud + " elu.");