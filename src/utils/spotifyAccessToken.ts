class SpotifyAccessToken {
  token: string;
  constructor(token?: string) {
    this.token = token ?? "";
  }
  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }
}

export default SpotifyAccessToken;
