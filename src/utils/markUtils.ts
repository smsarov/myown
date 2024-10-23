type indexedWord = "хороший" | "плохой" | "нейтральный" | "заметка";

function declineWord(count: number, wordBase: indexedWord) {
  const pluralRules = new Intl.PluralRules("ru");

  const pluralForm = pluralRules.select(count);

  const wordForms = {
    хороший: ["хорошая", "хороших", "хороших"],
    плохой: ["плохая", "плохих", "плохих"],
    нейтральный: ["нейтральная", "нейтральных", "нейтральных"],
    заметка: ["заметка", "заметки", "заметок"],
  };

  let form;
  switch (pluralForm) {
    case "one":
      form = wordForms[wordBase][0];
      break;
    case "few":
      form =  wordForms[wordBase][1];
      break
    default:
      form = wordForms[wordBase][2];
      break
  }

  return `${count} ${form}`
}

export { declineWord };
