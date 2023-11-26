import {Command} from "commander";
import {readdir} from "node:fs/promises"
import path from "path";

const app = new Command();


function tree(input) {
    const traverse = ({name, items}) =>
        name +
        (items?.length ?
            '\n' + items
                .map(traverse)
                .map((childText, childIndex, {length}) =>
                    childIndex < length - 1
                        ? '├── ' + childText.replace(/\n/g, '\n│   ')
                        : '└── ' + childText.replace(/\n/g, '\n    ')
                )
                .join('\n')
            : '')


    console.log(traverse(input))
}

app.version('0.0.1')
app.command('tree <startPath>')
    .option('-d, --depth <depth>', 'Глубина директорий')
    .description('Вывод списка файлов и папок файловой системы')
    .action(async (startPath, options) => {
        const depth = options.depth ?? 0;
        let directoriesCount = 0;
        let filesCount = 0;
        let fsTree = {name: '', items: []}
        const traverse = async (file, obj) => {
            const currentPath = `${file.path}/${file.name}`;
            const currentDepth = path.relative(startPath, currentPath).split('/').length;
            obj.name = file.name;

            const files = await readdir(currentPath, {withFileTypes: true})

            for (const file of files) {
                let rowObj = {name: file.name, items: []};

                if (file.isDirectory()) {
                    directoriesCount++

                    if (currentDepth < depth + 1) {
                        await traverse(file, rowObj)
                    }
                } else {
                    filesCount++
                }

                obj.items.push(rowObj);
            }
        };

        await traverse(
            {
                path: path.dirname(startPath),
                name: path.basename(startPath)
            },
            fsTree
        )

        tree(fsTree)

        console.log(`${directoriesCount} directories, ${filesCount} files`)
    })
    .parse(process.argv)

