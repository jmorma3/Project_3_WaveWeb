import './HiAdminCard.css'
import { Card, Typography } from "@mui/material";
import coffeeImage from '../../assets/coffee.jpg'

const HiAdminCard = () => {
    return (
        <>
            <Card className="polaroid" >
                <img src={coffeeImage} alt="Error" className="card-image" />
                <div className="text-content">
                    <Typography variant="h2">Hi Boss!</Typography>
                    <Typography variant="h5">Let's do great things today, but first.... coffee</Typography>
                </div>
            </Card>
        </>
    )
}

export default HiAdminCard