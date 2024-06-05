import bg from './../img/guitar.jpg'

export const info = [
    {
        src: "https://www.collegemagazine.com/wp-content/uploads/2022/02/charl-folscher-BylGq6lh6fE-unsplash.jpg",
        onChoose:'academic',
        alt: "Image 1",
        className: "image img-fluid",
        style: { height: '100vh', width: '100%',border:'solid',borderRight:'none', borderColor:'gray' },
        choice: 'ACADEMIC'
    },
    {
        src:"https://wallpapers-clan.com/wp-content/uploads/2023/04/soccer-player-background.jpg",
        onChoose:'non-academic',
        alt:"Image 2",
        className:"image img-fluid",
        style:{ height: '100vh', width: '100%',border:'solid',borderRight:'none', borderColor:'gray' },
        choice: 'NON ACADEMIC'
    },
    {
        src:bg,
        onChoose:'co-curricular',
        alt:"Image 3",
        className:"image img-fluid",
        style:{ height: '100vh', width: '100%',border:'solid', borderRight:'none' , borderColor:'gray' },
        choice: 'CO-CURRICULAR'
    }
]