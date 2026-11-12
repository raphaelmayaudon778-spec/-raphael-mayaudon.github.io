// Menu mobile et menus déroulants
document.addEventListener("DOMContentLoaded", function () {
    var burger = document.querySelector(".burger");
    var menu = document.querySelector(".menu");

    // Ouvrir / fermer le menu sur téléphone
    if (burger && menu) {
        burger.addEventListener("click", function () {
            var open = menu.classList.toggle("show");
            burger.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    // Ouvrir / fermer un menu déroulant au clic
    var toggles = document.querySelectorAll(".menu > li > button");
    toggles.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            var li = btn.parentElement;
            var wasOpen = li.classList.contains("open");
            document.querySelectorAll(".menu > li.open").forEach(function (el) {
                el.classList.remove("open");
                el.querySelector("button").setAttribute("aria-expanded", "false");
            });
            if (!wasOpen) {
                li.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Fermer les menus en cliquant ailleurs ou avec Échap
    document.addEventListener("click", function () {
        document.querySelectorAll(".menu > li.open").forEach(function (el) {
            el.classList.remove("open");
        });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".menu > li.open").forEach(function (el) {
                el.classList.remove("open");
            });
            if (menu) menu.classList.remove("show");
        }
    });

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll(".menu a").forEach(function (a) {
        a.addEventListener("click", function () {
            if (menu) menu.classList.remove("show");
        });
    });

    // Effet "terminal" sur la page d'accueil : les lignes s'affichent une par une
    var term = document.getElementById("terminal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (term && !reduce) {
        var lines = Array.prototype.slice.call(term.querySelectorAll(".line"));
        lines.forEach(function (l) { l.style.visibility = "hidden"; });
        var i = 0;
        function next() {
            if (i >= lines.length) return;
            var line = lines[i++];
            line.style.visibility = "visible";
            var cmd = line.querySelector(".cmd");
            if (cmd) {
                // on "tape" la commande lettre par lettre
                var text = cmd.textContent, n = 0;
                cmd.textContent = "";
                var t = setInterval(function () {
                    cmd.textContent = text.slice(0, ++n);
                    if (n >= text.length) { clearInterval(t); setTimeout(next, 250); }
                }, 45);
            } else {
                setTimeout(next, 120);
            }
        }
        setTimeout(next, 400);
    }

    // Année automatique dans le pied de page
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});
