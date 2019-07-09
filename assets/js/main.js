let thisUserName;
let thisUserPassword;
let playerCount = [];

let player1choice, player2choice, p1Wins, p2Wins;
let player1Name, player2Name;
const choices = ["rock", "paper", "scissors"];

function playOffline() {
    p1Wins = 0;
    p2Wins = 0;
    player1Name = "You";
    player2Name = "Computer";
    $(".who-won").text("NEW GAME!");
    $(".p1-win-count").text(p1Wins);
    $(".p2-win-count").text(p2Wins);
    $("#player1-name").text(player1Name);
    $("#player2-name").text(player2Name);
}

function checkWinner(p1Choice, p2Choice) {
    $(".who-won").text("");
    let whichPlayer;
    if (p1Choice === p2Choice) {
        whichPlayer = "Draw!";
        $(".who-won").text(whichPlayer);
    } else if (p1Choice === "rock") {
        if (p2Choice === "paper") {
            p2Wins++;
            whichPlayer = player2Name;
        } else if (p2Choice === "scissors") {
            p1Wins++;
            whichPlayer = player1Name;
        }
        $(".who-won").text(whichPlayer + " WON!");
    } else if (p1Choice === "paper") {
        if (p2Choice === "scissors") {
            p2Wins++;
            whichPlayer = player2Name;
        } else if (p2Choice === "rock") {
            p1Wins++;
            whichPlayer = player1Name;
        }
        $(".who-won").text(whichPlayer + " WON!");
    } else if (p1Choice === "scissors") {
        if (p2Choice === "rock") {
            p2Wins++;
            whichPlayer = player2Name;
        } else if (p2Choice === "paper") {
            p1Wins++;
            whichPlayer = player1Name;
        }
        $(".who-won").text(whichPlayer + " WON!");
    }
    $(".p1-win-count").text(p1Wins);
    $(".p2-win-count").text(p2Wins);
}

function signUserIn(user) {
    console.log(user.email + " has been signed in!");
}

function removeByValue(array, value) {
    return array.filter(function(elem, _index) {
        return value != elem;
    });
}

$(document).ready(function() {
    $(".modal").modal();
    $(".tabs").tabs();

    $(".choice").click(function(e) {
        $(this).css({
            transform: "scale(1.1) translateY(-1rem)",
            "background-color": "#F2F2F2",
            "animation-name": "moveDown",
            "animation-duration": "1s",
            "animation-fill-mode": "forwards"
        });
    });

    $("#play-btn").click(function(e) {
        e.preventDefault();

        $(".intro-container").addClass("invisible");
        $(".lobby-container").removeClass("invisible");
    });

    $("#offline-btn").click(function(e) {
        e.preventDefault();

        $(".lobby-container").addClass("invisible");
        $(".game-container").removeClass("invisible");
        $(".btn-reset").removeClass("invisible");
        $(".btn-main-menu").removeClass("invisible");
        playOffline();
    });

    $("#login-submit").click(function(e) {
        e.preventDefault();
        thisUserName = $("#username-log-in").val();
        thisUserPassword = $("#password-check").val();
        console.log("name: " + thisUserName);
        console.log("password: " + thisUserPassword);
    });

    $(".btn-reset").click(function(e) {
        e.preventDefault();
        playOffline();
    });

    $(".btn-main-menu").click(function(e) {
        e.preventDefault();
        playOffline();
        $(".game-container").addClass("invisible");
        $(".lobby-container").removeClass("invisible");
        $(".btn-reset").addClass("invisible");
        $(".btn-main-menu").addClass("invisible");
    });

    $(".choice").click(function(e) {
        e.preventDefault();
        let index = Math.floor(Math.random() * choices.length);
        console.log(index);
        player2choice = choices[index];
        console.log(player2choice);
        if ($(this).is("#rock")) {
            player1choice = choices[0];
        } else if ($(this).is("#paper")) {
            player1choice = choices[1];
        } else {
            player1choice = choices[2];
        }

        checkWinner(player1choice, player2choice);
    });


});

let playerClicked;
$(document).on('click', 'li.collection-item', function (e) {
    e.preventDefault();
    playerClicked = $(this).data('name');
    console.log(playerClicked);
});



    

// ==============================================================

let keys = [];
let currentUserKey;
let currentUser;
let thisRef;
let userList;
// ==============================================================

usersRef.on("value", gotData, errData);

function gotData(data) {
    $('.collection-item').remove();
    console.log(data.val());
    let users = data.val();
    userList = users;
    keys = Object.keys(users);
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        let j = keys[i];
        let username = users[j].user;
        let isOnline = users[j].isOnline;
        if (auth.currentUser && username == auth.currentUser.email) {
            currentUserKey = j;
            currentUser = auth.currentUser.email;
            console.log(`${currentUser}'s key is equal to ${currentUserKey}`);
        }
        // const usersRef = db.ref(`users/${currentUser}`);
        // console.log(usersRef);
    
        if (isOnline) {
            createPlayer(username);
        } else {
            removePlayer(username);
        }
    }

}


function createPlayer(player) {
    let icon = $("<i>")
        .addClass("material-icons")
        .text("send");
    let link = $("<a>")
        .addClass("secondary-content")
        .attr("href", "#")
        .append(icon);
    let div = $("<div>")
        .text(player)
        .append(link)
        .addClass("collection-item-container")
    let list = $("<li>")
        .addClass("collection-item")
        .attr("data-name", player)
        .append(div);
    $(".player-list").append(list);
}

function removePlayer(user) {
    $(`.collection-item[data-name='${user}']`).remove();
}

function errData(err) {
    console.log("ERROR");
    console.log(err);
}
// ==============================================================
connectedRef.on('value', function(connectedSnap) {
    if (connectedSnap.val() === true) {
      /* we're connected! */
      console.log('THIS USER HAS BEEN CONNECTED!');
        db.ref(`users/${auth.currentUser.uid}`).set({
            userID: auth.currentUser.uid,
            user: auth.currentUser.email,
            isOnline: true,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
        db.ref(`users/${auth.currentUser.uid}`).onDisconnect().set({
            userID: auth.currentUser.uid,
            user: auth.currentUser.email,
            isOnline: false,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        })

    } else {
      /* we're disconnected! */
    //   db.ref(`users/${currentUserKey}`).update({
    //     isOnline: false,
    //   });
    }
  });
// ==============================================================

auth.onAuthStateChanged(user => {
    if (user) {
        signUserIn(user);
        $("#login-btn").addClass("invisible");
        $("#sign-up-btn").addClass("invisible");
        $("#sign-out").removeClass("invisible");

        playerCount.push(user.email);
        console.log(playerCount);
        // console.log(db.ref


    } else {
        console.log("user logged out");
        $("#login-btn").removeClass("invisible");
        $("#sign-up-btn").removeClass("invisible");
        $("#sign-out").addClass("invisible");
    }
});

/////////////////////////////////////////
//////HANDLE SIGN UP////////////////////
///////////////////////////////////////

$("#create-account").click(function(e) {
    e.preventDefault();
    let emailInput = $("#email-sign-up");
    let passwordInput = $("#password-create");
    let passwordCheck = $("#password-create-validate");
    console.log(emailInput.val(), passwordInput.val(), passwordCheck.val());
    if (
        emailInput.hasClass("valid") &&
        passwordInput.hasClass("valid") &&
        passwordCheck.hasClass("valid")
    ) {
        let userEmail = emailInput.val();
        let userPassword = passwordInput.val();
        let userPCheck = passwordCheck.val();

        emailInput.val("");
        passwordInput.val("");
        passwordCheck.val("");
        // ```db.ref(`/users/${user.uid}`).push({"ALL THE DATA})```
        if (userPassword === userPCheck) {
            auth.createUserWithEmailAndPassword(userEmail, userPassword).then(
                cred => {
                    db.ref(`/users/${cred.user.uid}`).set({
                        userID: cred.user.uid,
                        user: cred.user.email,
                        isOnline: true,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    });

                    // signUserIn(cred.user);
                }
            );
        } else console.log("incorrect!");
    }
});


/////////////////////////////////////////
//////HANDLE SIGN OUT////////////////////
///////////////////////////////////////

$(".btn-sign-out").click(function(e) {
    e.preventDefault();
    let user = auth.currentUser;
    let userIndex = playerCount.indexOf(user);
    removePlayer(auth.currentUser.email);
    // db.ref("users/"+currentUserKey).set({ isOnline: false });
    
    console.log(user, userIndex);
    playerCount.splice(userIndex, 1);
    auth.signOut().then(function() {

    db.ref(`users/${currentUserKey}`).update({ isOnline: false });

    });
});

////////////////////////////////////////
//////HANDLE LOG IN////////////////////
//////////////////////////////////////

$("#login-submit").click(function(e) {
    e.preventDefault();
    let emailInput = $("#email-log-in");
    let passwordInput = $("#password-check");
    console.log(emailInput.val(), passwordInput.val());
    if (emailInput.hasClass("valid") && passwordInput.hasClass("valid")) {
        let userEmail = emailInput.val();
        let userPassword = passwordInput.val();

        emailInput.val("");
        passwordInput.val("");
        auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred => {
            // signUserIn(cred.user);
            createPlayer(auth.currentUser.email);

            db.ref(`users/${auth.currentUser.uid}`).update({ isOnline: true });


        });
    }
});

