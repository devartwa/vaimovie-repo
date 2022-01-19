import React, { useEffect, useState, useRef } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  MainParamList,
  MovieProps,
  RequesterResponseModel,
} from '../../@types';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, setFavoriteList } from '../../redux';
import queryString from 'query-string';
import services from '../../services/services';
import requester from '../../services/requester';
import { format } from 'date-fns';

import {
  Container,
  Header,
  Teste,
  HeaderImage,
  Button,
  FavoriteButton,
  Icon,
  Loading,
  LoadingContent,
  MovieContent,
  MovieSectionTitle,
  MovieText,
  MovieInfo,
} from './styles';

type MovieDetailsNavigationProp = StackNavigationProp<
  MainParamList,
  'MovieDetails'
>;
type MovieDetailsRouteProp = RouteProp<MainParamList, 'MovieDetails'>;

type MovieDetailsProps = {
  route: MovieDetailsRouteProp;
  navigation: MovieDetailsNavigationProp;
};

interface ParamsProps {
  id: number;
}

export function MovieDetails({ navigation, route }: MovieDetailsProps) {
  const { id }: ParamsProps = route.params;
  const isMounted = useRef(true);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieProps>({} as MovieProps);

  const { favorite } = useSelector(
    (state: ApplicationState) => state.favoriteReducer
  );

  async function loadData() {
    const api_key = '18ecb673913ae32664cd5b73b0e5828a';
    const movieId = id;

    const endpointParams = queryString.stringify({
      api_key,
    });

    const service = {
      ...services.getDetails,
      endpoint: services.getDetails.endpoint
        .replace('{{movie_id}}', movieId.toString())
        .concat(endpointParams),
    };

    const result: RequesterResponseModel = await requester(service);

    if (result.success) {
      setData(result.data);
    } else {
      console.log('Error: ', result.error);
    }
    setLoading(false);
  }

  async function saveFavorite() {
    const saveList = [...favorite, data];
    dispatch(setFavoriteList(saveList));
    handleGoBack();
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    loadData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingContent>
          <Loading />
        </LoadingContent>
      ) : (
        <Container>
          <Header>
            <HeaderImage
              source={{
                uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
              }}
            />
            <Teste>
              <Button onPress={handleGoBack}>
                <Icon name="arrow-left" />
              </Button>
              <FavoriteButton onPress={saveFavorite}>
                <Icon name="heart" />
              </FavoriteButton>
            </Teste>
          </Header>
          <MovieContent>
            <MovieSectionTitle>Name</MovieSectionTitle>
            <MovieText>{data.title}</MovieText>

            <MovieSectionTitle>Description</MovieSectionTitle>
            <MovieText>{data.overview}</MovieText>

            <MovieSectionTitle>Production</MovieSectionTitle>
            <MovieText>
              {data.production_companies
                .map((company) => company.name)
                .join(', ')}
            </MovieText>

            <MovieSectionTitle>Additional Information</MovieSectionTitle>
            <MovieInfo>Rating: {data.vote_average}</MovieInfo>
            <MovieInfo>Votes: {data.vote_count}</MovieInfo>
            <MovieInfo>
              Release Date: {format(new Date(data.release_date), 'MM-dd-yyyy')}
            </MovieInfo>
            <MovieInfo>Budget: ${data.budget.toLocaleString()}</MovieInfo>
            <MovieInfo>Revenue: ${data.revenue.toLocaleString()}</MovieInfo>
            <MovieInfo>Runtime: {data.runtime}min</MovieInfo>
          </MovieContent>
        </Container>
      )}
    </React.Fragment>
  );
}
