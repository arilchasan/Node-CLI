const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//load kontak
const loadKontak = () => {
    const file = fs.readFileSync('data/kontak.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

//membuat file 
const dataPath = './data/kontak.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


const simpanKontak = (nama, hp, email) => {
    const contact = { nama, hp, email };
    const contacts = loadKontak();
    //cek duplikat nama 
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.blue.inverse.bold('Kontak sudah terdaftar, gunakan nama lain!'));
        return false;
    }
    
    //cek format hp
    if (validator.isMobilePhone(hp, 'id-ID')) {
        console.log(chalk.blue.inverse.bold('Nomor HP tidak valid!'));
        return false;
    }

    //cek format email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.blue.inverse.bold('Email tidak valid!'));
            return false;
        }
    }


    contacts.push(contact);
    fs.writeFileSync('data/kontak.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terima kasih sudah memasukkan data.'));
}

//menampilkan semua list kontak nama dan noHp
const listKontak = () => {
    const contacts = loadKontak();
    console.log(chalk.cyan.inverse.bold('Daftar Kontak : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. Nama = ${contact.nama} - NoHP = ${contact.hp}`);
    });
};

//detail berdasarkan nama
const detailKontak = (nama) => {
    const contacts = loadKontak();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase() );

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.hp);
    if(contact.email) {
        console.log(contact.email);
    }
};


const deleteKontak = (nama) => {
    const contacts = loadKontak();
    const newContact =  contacts.filter((contact) => 
        contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if(contacts.length === newContact.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/kontak.json', JSON.stringify(newContact));
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));

}
module.exports = { simpanKontak , listKontak , detailKontak , deleteKontak};