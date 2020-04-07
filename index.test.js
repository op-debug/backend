const Loker = require('./Loker')

test(`should be make 5 empty loker`, () => {
    let loker = new Loker();
    let command = 'init 5'.split(' ');

    expect(loker.init(command)).toBe('Berhasil membuat loker dengan jumlah 5');
})

test(`should be errot to init loker`, () => {
    let loker = new Loker();
    let command = 'init'.split(' ');

    expect(loker.init(command)).toBe('Error: command should be init [jumlah loker]');
})

describe('testing input user to empty loker', ()=> {
    let loker = new Loker();
    let command = 'init 1'.split(' ');
        loker.init(command)

    test(`should be input user with type identity 123 and`, () => {
        let command = 'input ktp 1'.split(' '); // contoh perintah input user kedalam loker
        expect(loker.input(command)).toBe('Kartu identitas tersimpan di loker nomor 1');
    })

    test(`should be command error and display the right syntax`, () => {
        let command = 'input'.split(' '); // contoh perintah input user kedalam loker
        expect(loker.input(command)).toBe('Error: command should be input [tipe identitas] [nomor identitas]');
    })

    test(`should be command error 'tipe identitas'`, () => {
        let command = 'input kk 21'.split(' '); // contoh perintah input user kedalam loker
        expect(loker.input(command)).toBe('Tipe identitas kk tidak diizinkan. \nYang diizinkan hanya sim dan ktp');
    })

    test(`should be command error 'nomor identitas'`, () => {
        let command = 'input sim 9i'.split(' '); // contoh perintah input user kedalam loker
        expect(loker.input(command)).toBe('Nomor identitas harus berupa angka');
    })


    
})

describe(`pengujian untuk find, search, dan input melebihi loker`, () => {
    let loker;

    beforeEach(()=>{
        loker = new Loker();
        let command = 'init 5'.split(' ');
        loker.init(command)

        for (let i = 0; i < 2; i++) {
            
            command = 'input sim 1'+i;
            loker.input(command.split(' '));
            // console.log('input data ',loker.loker)
        }

        for (let i = 0; i < 3; i++) {
            
            command = 'input ktp 2'+i;
            loker.input(command.split(' '));
            // console.log('input data ',loker.loker)
        }
    })

    test(`loker penuh`, () => {
        let command = 'input sim 21'.split(' '); // contoh perintah input user kedalam loker
        
        expect(loker.input(command)).toBe('loker sudah penuh!!');
    })

    test('menampilkan nomor loker berdasarkan nomor identitas', () => {
        let command = 'find 20'.split(' '); // contoh perintah mencari nomor loker berdasarkan nomor identitas
        expect(loker.find(command)).toBe('Kartu identitas tersebut berada di loker nomor 3');
    })

    test('menampilkan nomor identitas berdasarkan tipe identitas', () => {
        let command = 'search ktp'.split(' '); // contoh perintah mencari nomor loker berdasarkan nomor identitas
        expect(loker.search(command)).toBe('Nomor identitas dengan tipe identitas ktp: 20,21,22');
    })
})
