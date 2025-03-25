// Typewriter Effect Script
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

// Skills Rendering Script
const stackList = [
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        name: "Python",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/cplusplus/cplusplus-original.svg",
        name: "C++",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        name: "JavaScript",
    },

    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
        name: "HTML",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
        name: "CSS",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/tailwindcss/tailwindcss-original.svg",
        name: "Tailwind CSS",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
        name: "Typescript",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
        name: "ReactJS",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
        name: "NextJs",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
        name: "NodeJS",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/django/django-plain.svg",
        name: "Django",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/angular/angular-original.svg",
        name: "Angular",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        name: "Java",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/csharp/csharp-original.svg",
        name: "C#",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
        name: "MongoDB",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
        name: "Git",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
        name: "MySQL",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/supabase/supabase-original.svg",
        name: "Supabase",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/postgresql/postgresql-original.svg",
        name: "PostgreSQL",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg",
        name: "Bootstrap",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
        name: "VS Code",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/splunk/splunk-original-wordmark.svg",
        name: "Splunk",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        name: "AWS",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/slack/slack-original.svg",
        name: "Slack",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/docker/docker-original.svg",
        name: "Docker",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/linux/linux-original.svg",
        name: "Linux",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/qt/qt-original.svg",
        name: "Qt",
    },
    {
        img: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/unity/unity-original.svg",
        name: "Unity",
    }
];

function renderSkills() {
    const skillsContainer = document.getElementById("skills-container");

    stackList.forEach((skill) => {
        const skillItem = document.createElement("div");
        skillItem.classList.add("icon");
        skillItem.classList.add("major");

        const skillImage = document.createElement("img");
        skillImage.src = skill.img;
        skillImage.alt = skill.name;
        skillImage.classList.add("skill-icon");

        const skillName = document.createElement("p");
        skillName.textContent = skill.name;

        skillItem.appendChild(skillImage);
        skillItem.appendChild(skillName);

        skillsContainer.appendChild(skillItem);
    });
}

// Combined window.onload Handler
window.onload = function () {
    // Run the typewriter effect script
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Inject CSS for the typewriter effect
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff;}";
    css.innerHTML += ".typewrite { opacity: 70%; }";
    document.body.appendChild(css);

    // Render the skills
    renderSkills();
};