function capitalizeWords(sentence: string): string {

    let words = sentence.split(" ");
    // split by SPACE — gives us individual words

    let result: string[] = [];
    // blank paper to collect finished words

    for (let word of words) {
        // go through each word one by one

        if (word.length === 0) continue;
        // skip if word is empty — safety check

        let firstLetter = word.charAt(0).toUpperCase();
        // charAt(0) is safer than word[0]
        // gets first letter and makes it BIG

        let rest = word.slice(1).toLowerCase();
        // everything after the first letter → keep small

        result.push(firstLetter + rest);
        // join and write on paper
    }

    return result.join(" ");
    // stick all words back with space between
}

console.log(capitalizeWords("i am learning playwright"));
console.log(capitalizeWords("kamal sivakumar"));
console.log(capitalizeWords("hello world"));