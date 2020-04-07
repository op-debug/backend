class Loker{
    constructor(){
        this.loker = [];
        this.command = {
            init: 'init [jumlah loker]',
            status: 'status',
            input: 'input [tipe identitas] [nomor identitas]',
            leave: 'leave [nomor loker]',
            find: 'find [nomor identitas]',
            search: 'search [tipe identitas]'
        };

        this.init = this.init.bind(this);
        this.input = this.input.bind(this);
        this.leave = this.leave.bind(this);
        this.find = this.find.bind(this);
        this.search = this.search.bind(this);
    }

    init(argument) {
        if (argument.length > 1 && argument.length == 2) {
            
            let jumlah_loker = argument[1];
            
            for (let i = 0; i < jumlah_loker; i++) {
                this.loker.push({
                    'No Loker':i+1,
                    'Tipe Identitas':'-',
                    'No Identitas':'-',
                });
            }

            return 'Berhasil membuat loker dengan jumlah '+jumlah_loker;
        }
        else{
            return 'Error: command should be '+this.command.init;
        }
    }

    input(argument){
        if (argument.length > 1 && argument.length == 3) {
            const identitas = ['sim', 'ktp'];
            let identitas_user = argument[1].toLowerCase();
            let nomor_identitas = argument[2];

             
            if (nomor_identitas.match(/\D/g)) {
                return `Nomor identitas harus berupa angka`; 
            }


            if (identitas.includes(identitas_user)) {
                let nomor_loker = this.loker.findIndex(data => data['No Identitas']=='-');

                let loker_user = {
                    'No Loker': nomor_loker+1,
                    'Tipe Identitas': identitas_user,
                    'No Identitas': nomor_identitas
                }

                if (nomor_loker < 0) {
                    return `loker sudah penuh!!`;
                }

                this.loker[nomor_loker] = loker_user;

                return 'Kartu identitas tersimpan di loker nomor '+ (nomor_loker+1);
            }
            
            return `Tipe identitas ${identitas_user} tidak diizinkan. \nYang diizinkan hanya sim dan ktp`;
            
        }
        else{
            return 'Error: command should be '+this.command.input;
        }
    }

    leave(argument){
        if (argument.length > 1 && argument.length == 2) {
            
            let nomor_identitas = argument[1];
            
            let nomor_loker = this.loker.findIndex(data => data['No Identitas']==nomor_identitas);


            if (nomor_loker < 0) {
                return `Nomor identitas tidak ditemukan!!`;
            }


            this.loker[nomor_loker] = {
                'No Loker':nomor_loker+1,
                'Tipe Identitas':'-',
                'No Identitas':'-',
            };

            return `Loker nomor ${nomor_loker+1} berhasil dikosongkan`;
        }
        else{
            return 'Error: command should be '+this.command.leave;
        }
    }

    find(argument){
        if (argument.length > 1 && argument.length == 2) {
            
            let nomor_identitas = argument[1];
            
            let data_loker = this.loker.find(data => data['No Identitas'] == nomor_identitas);
            
            if (data_loker==undefined) {
                return `Nomor Identitas Tidak Ditemukan, coba lagi!`;
            }
            
            return `Kartu identitas tersebut berada di loker nomor ${data_loker['No Loker']}`;
        }
        else{
            return 'Error: command should be '+this.command.find;
        }
    }

    search(argument){
        if (argument.length > 1 && argument.length == 2) {
            
            let tipe_identitas = argument[1];
            

            let data_loker = this.loker.filter(data => data['Tipe Identitas'] == tipe_identitas);

            let nomor_identitas = [];
        
            if (data_loker.length < 1) {
                return `Tipe Identitas Tidak Ditemukan, coba lagi!`;
            }

            data_loker.forEach( item => nomor_identitas.push(item['No Identitas']));


            return `Nomor identitas dengan tipe identitas ${tipe_identitas}: ${nomor_identitas.join(',')}`;
        }
        else{
            return 'Error: command should be '+this.command.find;
        }
    }

    status(){
        return this.loker
    }

    help(){
        let result = Object.values(this.command);
        
        console.log('Documentation: ')
        result.forEach(data => {
            console.log(`-- ${data}`)
        })
        console.log('======================================================================\n')
    }
}

module.exports = Loker;