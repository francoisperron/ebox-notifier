describe("the warning mail", function () {

    var mail = require("../src/warning-mail");
    var usage = {actual: 99, max: 100};

    it("build mail using usage", function () {
        expect(mail.buildFrom(usage)).toBe('<b style="color:red">Utilisation: 99 G</b><p>Maximum: 100 G</p>');
    });
});