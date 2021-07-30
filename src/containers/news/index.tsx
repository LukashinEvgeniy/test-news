import {
  ButtonGroup,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/types/state";
import { getNewsCategoires } from "../../redux/selectors";
import { useState, useEffect, useMemo } from "react";
import newsApi from "../../lib/api/news";
import { NewsAuthor, NewsType } from "../../redux/types/entities";
import NewsItem from "./components/news-item";
import { useLocation, useParams } from "react-router-dom";
import history from "../../history";
import { routes } from "../../config/constants";
import useQuery from "../../hooks/query";

const radios = [
  { name: "Возрастанию", value: "asc" },
  { name: "Убыванию", value: "desc" },
];

const News = () => {
  const { newsCategory } = useSelector((state: AppState) => ({
    newsCategory: getNewsCategoires(state),
  }));

  const [news, setNews] = useState<NewsType[]>([]);
  const [authors, setAuthors] = useState<NewsAuthor[]>([]);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationActive, setPaginationActive] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState(1);
  const [sort, setSort] = useState("desc");

  const { authorId, page } =
    useParams<{ authorId: string | undefined; page: string | undefined }>();

  const query = useQuery();

  useEffect(() => {
    const loadData = async () => {
      const response = await newsApi.getAuthors();

      setAuthors(response);
    };
    loadData();
    authorId && setSelectedAuthor(parseInt(authorId));
    page && setPaginationActive(parseInt(page));

    const category = query.get("category");
    category && setSelectedCategory(parseInt(category));

    const sort = query.get("sort");
    sort && setSort(sort);
  }, []);

  useEffect(() => {
    const url = `${routes.news}/${selectedAuthor}/${paginationActive}?category=${selectedCategory}&sort=${sort}`;
    const loadData = async () => {
      const response = await newsApi.getNews(selectedAuthor, paginationActive, selectedCategory, sort);

      setNews(response.data);
      setPaginationCount(response.count);
    };

    loadData();
    history.push(url);
  }, [selectedAuthor, paginationActive, selectedCategory, sort]);

  const paginationItems = useMemo(() => {
    let items = [];
    for (let number = 1; number <= paginationCount / 10; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => setPaginationActive(number)}
          active={number === paginationActive}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  }, [paginationCount, paginationActive]);

  return (
    <Container>
      <Row>
        <Col>
          <Form.Label>Выберете категорию</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(event) => {
              event.target.value &&
                setSelectedCategory(parseInt(event.target.value));
            }}
            aria-label="Выберете категорию"
          >
            {newsCategory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Label>Выберете автора</Form.Label>
          <Form.Control
            as="select"
            value={selectedAuthor}
            onChange={(event) => {
              event.target.value &&
                setSelectedAuthor(parseInt(event.target.value));
            }}
            aria-label="Выберете автора"
          >
            {authors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col>
          <Row>
            <Form.Label>Сортировка по дате</Form.Label>
          </Row>
          <Row>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={sort === radio.value}
                  onChange={(e) => setSort(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Row>
        </Col>
      </Row>
      {news.map((item) => (
        <NewsItem key={item.title} {...item}></NewsItem>
      ))}
      <Pagination>{paginationItems}</Pagination>
    </Container>
  );
};

export default News;
