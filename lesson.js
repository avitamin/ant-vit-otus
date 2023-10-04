const input = {
    "name": 1,
    "items": [
        {
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
        },
        {
        "name": 5,
        "items": [{ "name": 6 }]
        }
    ]
}

function tree(input){
    const traverse = ({name, items}) =>
        name +
        (items?.length ?
            '\n'  +  items
                .map(traverse)
                .map((childText, childIndex, {length}) =>
                    childIndex < length - 1
                        ? '├── ' + childText.replace(/\n/g,'\n│   ')
                        : '└── ' + childText.replace(/\n/g,'\n    ')
                )
                .join('\n')
            :'')


    console.log(traverse(input))
}

tree(input)

// target
// 1
// ├── 2
// │   ├── 3
// │   └── 4
// └── 5
//     └── 6

// my
// 1
// ├── 2
// │   ├── 3
// │   └── 4
// └── 5
//     └── 6
