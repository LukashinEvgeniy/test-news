import moment from "moment"
import { Card, Col, Container, Row } from "react-bootstrap"
import { NewsType } from "../../../redux/types/entities"

type NewsItemProps = NewsType

const NewsItem = (props: NewsItemProps) => {
    return (
        <Card style={{marginTop: '16px', padding: '8px'}}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{`${props.category.name}, ${props.author.name}, ${moment(props.date).format('lll')}`}</Card.Subtitle>
            <Card.Text>{props.text}</Card.Text>
        </Card>
    )
}

export default NewsItem;