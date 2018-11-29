var fs = require("fs")


module.exports = function(app) {
    app.post("/api/poststring", function(req, res) {
        const words = fs.readFileSync("./public/dictionary/words.txt", "utf8");
        const wordsArray = words.split("\r\n");
        wordsArray.push("homespotter")
        let rowsOfSearch = req.body.stringtoparse.split("\r\n");
        let splitRowsOfSearch = [];
        for (i in rowsOfSearch) {
            var newRow = [];
            newRow.push(rowsOfSearch[i].split(" "));
            splitRowsOfSearch.push(newRow[0].join(""))
        }
        let wordsFound = [];

        for (let row in splitRowsOfSearch) {
            console.log("row is :", row);
            var backwardsString = splitRowsOfSearch[row];
            backwardsString = backwardsString.split("");
            backwardsString = backwardsString.reverse();
            backwardsString = backwardsString.join("");
            for (var letter = 0; letter < splitRowsOfSearch[row].length;letter++) {
                var longestRightWords = [];
                var longestLeftWords = [];
                if (splitRowsOfSearch[row].length - letter > 3) {
                    for (var lettersLeft = 4; lettersLeft < (splitRowsOfSearch[row].length - letter + 1); lettersLeft++) {

                        if (wordsArray.includes(backwardsString.slice(letter, (letter + lettersLeft)).toLowerCase())) {
                            longestLeftWords.push(backwardsString.slice(letter, (letter + lettersLeft)))
                        }
                        if (wordsArray.includes(splitRowsOfSearch[row].slice(letter, (letter + lettersLeft)).toLowerCase())) {
                            var word = splitRowsOfSearch[row].slice(letter, (letter + lettersLeft));
                            longestRightWords.push(word)
                        }
                    }
                }
                if (longestRightWords[longestRightWords.length - 1]) {
                    wordsFound.push(longestRightWords[longestRightWords.length - 1]);
                }
                if (longestLeftWords[longestLeftWords.length - 1]) {
                    wordsFound.push(longestLeftWords[longestLeftWords.length - 1])
                }
            }
        }

        for (let index = 0; index < splitRowsOfSearch[0].length; index++) {
            let verticalString = "";
            let upsideDownString = "";
            for (let row in splitRowsOfSearch) {
                verticalString += splitRowsOfSearch[row][index]
            }
            upsideDownString = verticalString;
            upsideDownString = upsideDownString.split("");
            upsideDownString = upsideDownString.reverse();
            upsideDownString = upsideDownString.join("");
            for (let letters = 0; letters < verticalString.length; letters++) {
                var longestUpWords = [];
                var longestDownWords = [];
                if ((verticalString.length - letters) > 3)
                    for (let lettersLeft = 4; lettersLeft < (verticalString.length - letters + 1); lettersLeft++) {
                        console.log("KJDGSKJLDGSKJL", typeof letters, typeof lettersLeft)

                        console.log(verticalString.slice(letters, (letters + lettersLeft)), "letter is :", letters, "lettersLeft is :", lettersLeft, "L+LL", (letters + lettersLeft) );
                        console.log(verticalString);
                        if (wordsArray.includes(verticalString.slice(letters, (letters + lettersLeft)).toLowerCase())) {
                            longestUpWords.push(verticalString.slice(letters, (letters + lettersLeft)))
                        }
                        if (wordsArray.includes(upsideDownString.slice(letters, (letters + lettersLeft)).toLowerCase())) {
                            longestDownWords.push(upsideDownString.slice(letters, (letters + lettersLeft)))
                        }
                    }
                if (longestUpWords[longestUpWords.length - 1]) {
                    wordsFound.push(longestUpWords[longestUpWords.length - 1]);
                }
                if (longestDownWords[longestDownWords.length - 1]) {
                    wordsFound.push(longestDownWords[longestDownWords.length - 1])
                }
            }
        }

        res.json({"words": wordsFound})
    });

};
