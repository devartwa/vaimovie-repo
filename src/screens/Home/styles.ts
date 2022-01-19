import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, FlatListProps } from 'react-native';
import { ResultProps } from '../../@types';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 24px;
`;

export const Header = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: ${getStatusBarHeight(true) + 180}px;
`;

export const MovieList = styled(
  FlatList as new (props: FlatListProps<ResultProps>) => FlatList<ResultProps>
).attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-vertical: ${RFValue(15)}px;
`;

export const MovieCardWrapper = styled.Pressable`
  width: 50%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  elevation: 5;
`;

export const MovieCard = styled.View`
  width: 100%;
  margin-vertical: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

export const MovieCardImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  height: 150px;
  width: 100%;
  background-color: transparent;
  margin-bottom: 10px;
`;

export const MovieCardTitle = styled.Text`
  margin-top: 10px;
  width: 100%;
  min-height: 48px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

export const MovieCardReleaseDate = styled.Text`
  width: 100%;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

export const LoadingContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: theme.colors.red,
})``;
