import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  episode?: Maybe<Array<Maybe<Episode>>>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Origin>;
  species?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CharacterResponse = {
  __typename?: 'CharacterResponse';
  info?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type CustomCharacter = {
  __typename?: 'CustomCharacter';
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isCustom: Scalars['Boolean']['output'];
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Origin>;
  species?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  air_date?: Maybe<Scalars['String']['output']>;
  characters: Array<Maybe<Character>>;
  created?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type EpisodeInput = {
  air_date?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  species?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Location = {
  __typename?: 'Location';
  created?: Maybe<Scalars['String']['output']>;
  dimension?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  residents?: Maybe<Array<Maybe<Character>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocationInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter?: Maybe<CustomCharacter>;
  deleteCharacter?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateCharacterArgs = {
  input: NewCharacterInput;
};


export type MutationDeleteCharacterArgs = {
  id: Scalars['ID']['input'];
};

export type NewCharacterInput = {
  episode?: InputMaybe<Array<InputMaybe<EpisodeInput>>>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isCustom: Scalars['Boolean']['input'];
  location?: InputMaybe<LocationInput>;
  name: Scalars['String']['input'];
  origin?: InputMaybe<OriginInput>;
  species?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Origin = {
  __typename?: 'Origin';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type OriginInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count?: Maybe<Scalars['Int']['output']>;
  next?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  prev?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  character?: Maybe<Character>;
  characters?: Maybe<CharacterResponse>;
  getCustomCharacter?: Maybe<CustomCharacter>;
  listCustomCharacters?: Maybe<Array<Maybe<CustomCharacter>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCustomCharacterArgs = {
  id: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<Character>;
  CharacterResponse: ResolverTypeWrapper<CharacterResponse>;
  CustomCharacter: ResolverTypeWrapper<CustomCharacter>;
  Episode: ResolverTypeWrapper<Episode>;
  EpisodeInput: EpisodeInput;
  FilterCharacter: FilterCharacter;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewCharacterInput: NewCharacterInput;
  Origin: ResolverTypeWrapper<Origin>;
  OriginInput: OriginInput;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Character: Character;
  CharacterResponse: CharacterResponse;
  CustomCharacter: CustomCharacter;
  Episode: Episode;
  EpisodeInput: EpisodeInput;
  FilterCharacter: FilterCharacter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationInput: LocationInput;
  Mutation: {};
  NewCharacterInput: NewCharacterInput;
  Origin: Origin;
  OriginInput: OriginInput;
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
};

export type CharacterResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  episode?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['Origin']>, ParentType, ContextType>;
  species?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CharacterResponse'] = ResolversParentTypes['CharacterResponse']> = {
  info?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomCharacterResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CustomCharacter'] = ResolversParentTypes['CustomCharacter']> = {
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCustom?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['Origin']>, ParentType, ContextType>;
  species?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  characters?: Resolver<Array<Maybe<ResolversTypes['Character']>>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dimension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  residents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCharacter?: Resolver<Maybe<ResolversTypes['CustomCharacter']>, ParentType, ContextType, RequireFields<MutationCreateCharacterArgs, 'input'>>;
  deleteCharacter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteCharacterArgs, 'id'>>;
};

export type OriginResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Origin'] = ResolversParentTypes['Origin']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  prev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<Maybe<ResolversTypes['CharacterResponse']>, ParentType, ContextType, Partial<QueryCharactersArgs>>;
  getCustomCharacter?: Resolver<Maybe<ResolversTypes['CustomCharacter']>, ParentType, ContextType, RequireFields<QueryGetCustomCharacterArgs, 'id'>>;
  listCustomCharacters?: Resolver<Maybe<Array<Maybe<ResolversTypes['CustomCharacter']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Character?: CharacterResolvers<ContextType>;
  CharacterResponse?: CharacterResponseResolvers<ContextType>;
  CustomCharacter?: CustomCharacterResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Origin?: OriginResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

