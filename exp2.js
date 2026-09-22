const fs = require('fs');

// 1. Write / create file
fs.writeFile('example.txt', 'Hello world!', (err) => {
    if (err) throw err;

    console.log('File created!');

    // 2. Read file
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) throw err;

        console.log('File content:', data);

        // 3. Append content
        fs.appendFile('example.txt', '\nThis is the appended content.', (err) => {
            if (err) throw err;

            console.log('Content appended to the file!');

            // 4. Delete file
            fs.unlink('example.txt', (err) => {
                if (err) throw err;

                console.log('File deleted!');
            });
        });
    });
});
