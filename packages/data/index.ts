import tokens from "@iron/data/tokens.json" with { type: "json" };
import genTokens from "@iron/data/gen/tokens.json" with { type: "json" };

export interface Token {
  chainId: number;
  address: string | null;
  name: string;
  symbol: string;
}

const tokensHash = [...tokens, ...genTokens].reduce(
  (acc, { address, chainId, name, symbol }) => {
    acc.set(`${chainId}/${address?.toLowerCase()}`, {
      address,
      chainId,
      name,
      symbol,
    });
    return acc;
  },
  new Map<string, Token>(),
);

export function getWhitelistedTokenNameAndSymbol(
  chainId: number,
  address?: string,
): Token | undefined {
  return tokensHash.get(`${chainId}/${address?.toLowerCase()}`);
}
