describe("the unavailable mail", function () {

    var mail = require("../src/unavailable-mail");

    it("build mail non disponible when usage is -1", function () {
        expect(mail.build()).toBe("<b>Utilisation non disponible</b>");
    });
});