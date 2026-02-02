export class HeaderView {
    constructor() {
        this.container = document.getElementById('main-header');
    }

    render(categories, onNavigate) {
        this.container.innerHTML = '';
        
        const nav = document.createElement('nav');
        nav.className = 'nav-menu';

        const createButton = (text, onClick) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.className = 'nav-btn';
            btn.onclick = () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                onClick();
            };
            return btn;
        };

        const homeBtn = createButton('Home', () => onNavigate('home'));
        homeBtn.classList.add('active');
        nav.appendChild(homeBtn);

        categories.forEach(cat => {
            const btn = createButton(cat.name, () => onNavigate(cat.name));
            nav.appendChild(btn);
        });

        this.container.appendChild(nav);
    }
}