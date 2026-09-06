
    let الرقم = Math.floor(Math.random() * 11);
    let التخمين;
    //let  guessedNumber = 5;

    do {
        التخمين = Number(prompt("خمن رقم من 0 إلى 10"));

        if (التخمين === الرقم)
            alert("صح! أحسنت");
        else if (التخمين < الرقم)
            alert("الرقم منخفض، حاول مرة ثانية");
        else
            alert("الرقم مرتفع، حاول مرة ثانية");

    } while (التخمين !== الرقم);



