document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  const formulaElements = document.querySelectorAll("formula");

  const evaluateFormulas = () => {
    formulaElements.forEach(formulaElement => {
      const formula = formulaElement.getAttribute("evaluator");
      let result = "Invalid Formula";

      try {
        const variables = {};
        inputs.forEach(input => {
          const id = input.id;
          const value = parseFloat(input.value) || 0;
          variables[id] = value;
        });

        const formulaWithValues = formula.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, match => {
          return variables.hasOwnProperty(match) ? variables[match] : match;
        });

        result = eval(formulaWithValues);
      } catch (error) {
        console.error("Error evaluating formula:", error);
      }

      const resultElement = formulaElement.nextElementSibling;
      if (resultElement) {
        resultElement.textContent = isNaN(result) ? "Invalid Formula" : `= ${result}`;
      }
    });
  };

  inputs.forEach(input => {
    input.addEventListener("input", evaluateFormulas);
  });

  evaluateFormulas();
});
