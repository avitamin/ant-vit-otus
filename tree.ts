export function tree(input) {
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
