import { Card, CardContent, Typography, Checkbox, Divider } from '@mui/material';

function PlanCard({ plan, selected, onSelect }) {
    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 168,
                m: 1,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? 'primary.main' : 'grey.300',
                boxShadow: selected ? 3 : 1,
            }}
            onClick={() => onSelect(plan.title)}
        >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontSize: '0.995rem',mb:1 }}>
                    {plan.title}
                </Typography>
                <Divider></Divider>

                <Typography color="text.secondary" sx={{ fontSize: '0.875rem', mb:1 }}>
                    {plan.subtitle}
                </Typography>
                {plan.features.map((feature, index) => (
                    <Typography variant="body2" key={index} sx={{ display: 'flex', alignItems: 'center', margin: '-7px 0', mb:1, fontSize: '0.775rem' }}>
                        <Checkbox checked={true} disabled />
                        {feature}
                    </Typography>
                ))}
                <Divider></Divider>
                <Typography variant="h6" color="primary"sx={{ fontSize: '0.975rem',mt:1, textAlign: 'center' }} >
                    {plan.price}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PlanCard;
