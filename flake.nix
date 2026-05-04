{
  description = "Development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_24
          pkgs.pnpm
          pkgs.eslint
        ];

        NODE_ENV = "development";

        shellHook = ''
          export PATH="${pkgs.nodejs_24}/bin:$PATH"
        '';
      };
    };
}
