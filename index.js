const Loker = require('./Loker')
      func = new Loker();

process.stdin.on('readable', () => {
    let chunk;
    
    while ((chunk = process.stdin.read()) !== null) {
        let argv = new String(Buffer.from(chunk)).split('\r\n')[0];
            argv = argv.split(' ');

        let command = argv[0].toLowerCase();
        let result;
        
        if (command !== 'end'  && func[command]!==undefined) {
            result = func[command](argv);
        }
        else if(command == 'end'){
            process.exit(0);
        }
        else{
            result = `Command not found. type 'help' to see documentation`;
        }

        // switch (command) {
        //     case 'init':
        //         result = func.init(argv);
        //         break;
        //     case 'input':
        //         result = func.input(argv);
        //         break;
        //     case 'leave':
        //         result = func.leave(argv);
        //         break;
        //     case 'status':
        //         result = func.status(argv);
        //         break;
        //     case 'find':
        //         result = func.status(argv);
        //         break;
        //     case 'find':
        //         result = func.status(command);
        //         break;
        //     case 'end':
        //         process.exit(0)
        //         break;
        //     default:
        //         break;
        // }

        if (command === 'status') {
            console.table(result);
            console.log('======================================================================\n')
        }
        else if(command !== 'help'){
            console.log(`${result}\n======================================================================\n`);
        }
    }
  });

//   process.stdin.on('end', () => {
//     process.stdout.write('end');
//   });