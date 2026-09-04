document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("current-year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    var navLinks = Array.prototype.slice.call(
        document.querySelectorAll(".nav-links a[href^='#']")
    );

    if (!("IntersectionObserver" in window) || navLinks.length === 0) {
        return;
    }

    var sectionLinks = new Map();

    navLinks.forEach(function (link) {
        var target = document.querySelector(link.getAttribute("href"));
        if (target) {
            sectionLinks.set(target.id, link);
        }
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(function (link) {
                    link.removeAttribute("aria-current");
                });

                var activeLink = sectionLinks.get(entry.target.id);
                if (activeLink) {
                    activeLink.setAttribute("aria-current", "location");
                }
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        }
    );

    sectionLinks.forEach(function (_link, id) {
        var section = document.getElementById(id);
        if (section) {
            observer.observe(section);
        }
    });
});

