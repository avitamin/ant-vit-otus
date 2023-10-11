
const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};

function deepEqual(actual , expected) {
    let currentPath='';
    const equal = (actual, expected) => {
        for (const [name, value] of Object.entries(expected)) {
            currentPath+= (currentPath.length ? '.' : '$') +name;

            if(!Object.hasOwn(actual,name)){
                throw new Error(currentPath)
            }

            switch (typeof value){
                case "bigint":
                case "number":
                case "boolean":
                case "string":
                case "symbol":
                case "undefined":
                    if(value!==actual[name])
                        throw new Error(currentPath)
                    break;
                case "object":
                    equal(actual[name],value)
                    break;
            }
        }
    };

    try {
        equal(actual,expected);
        console.log('OK');
    }catch (e) {
        console.log(`Error: ${currentPath}`);
    }
}


function main() {

    deepEqual(obj1,obj1)
    deepEqual(obj1,obj2)
    deepEqual(obj1,obj3)
}

main()
