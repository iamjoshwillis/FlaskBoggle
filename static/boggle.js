class BoggleGame {
    
  constructor(boardId, secs = 60) {

    console.log("test")
    this.secs = secs;
    this.showTimer();

    this.score = 0;
    this.words = new Set();
    this.board = $(boardId);

    // this.timer = setInterval(this.tick.bind(this), 1000);

    $(".add-word").on("submit", this.wordSubmit.bind(null, this.board));
  }

  showWord(word) {
    $(".words", this.board).append($("<li>", { text: word }));
  }

  showScore() {
    $(".score", this.board).text(this.score);
  }

  async wordSubmit(e) {
    e.preventDefault();
    const $word = $(".word", this.board);

    let word = $word.val();
    if (!word) return;

    if (this.words.has(word)) {
      this.showMessage("This word has already been added");
      return;
    }

    const resp = await axios.get("/check-word", { params: { word: word } });
    if (resp.data.result === "not-word") {
      this.showMessage('NOT VALID WORD', "err");
    } else if (resp.data.result === "not-on-board") {
      this.showMessage('NOT VALID WORD');
    } else {
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage('WORD ADDED', "ok");
    }
    $word.val("").focus();
  }
  showTimer() {
    $(".timer", this.board).text(this.secs);
  }
}

const testRun = new BoggleGame("first", 60)
console.log("IS THIS WORKING?");
