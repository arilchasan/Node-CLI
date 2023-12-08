const yargs = require('yargs');
const contacts = require('./contact');


yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            type: 'string',
            demonOptions: true,
        },
        email: {
            describe: 'Email',
            demandOptions: false,
            type: 'string',
        },
        hp: {
             describe: 'Nomor Handphone',
             demandOptions: true,
             type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanKontak(argv.nama,argv.hp,argv.email);
    }
}).demandCommand();

//menampilkan daftar semua nama dan nohp kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan nohp kontak',
    handler() {
        contacts.listKontak();
    }
}).demandCommand();


//menampilkan detai sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            type: 'string',
            demonOptions: true,
        },
    },
    handler(argv) {
        contacts.detailKontak(argv.nama);
    }
})

//menghapus kontak berdarakan nama
yargs.command({
    command: 'delete',
    describe: 'Mengahpus kontak berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            type: 'string',
            demonOptions: true,
        },
    },
    handler(argv) {
        contacts.deleteKontak(argv.nama);
    }
})



yargs.parse();



















//mengambil argment dari command line
// const command = process.argv[2];
// if(command === 'add'){
//     console.log('Menambahkan kontak baru');
// } else if(command === 'remove') {
//     console.log('Menghapus kontak');
// } else if(command === 'list') {
//     console.log('Menampilkan semua kontak');
// }
// const contact = require('./contact');

// const main = async () => {
//     console.log('Selamat datang di aplikasi kontak');
//     const nama = await contact.tulisPertanyaan('Masukkan nama anda : ');
//     const hp = await contact.tulisPertanyaan('Masukkan Nomor Hp : ');
//     const email = await contact.tulisPertanyaan('Masukkan Email anda : ');

//     contact.simpanKontak(nama, hp, email);
// }

// main()