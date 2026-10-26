import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';

export interface AppRelease {
  version: string | null;
  apkUrl: string | null;
  releaseUrl: string;
  sizeBytes: number | null;
  publishedAt: string | null;
}

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: GitHubAsset[];
}

const REPOSITORIO = 'ClaytonPrebelli/AppKaraokeSorocaba';
const API_RELEASE = `https://api.github.com/repos/${REPOSITORIO}/releases/latest`;
const PAGINA_RELEASES = `https://github.com/${REPOSITORIO}/releases/latest`;
const CACHE_KEY = 'karaoke.app.release';
const CACHE_TTL_MS = 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AppDownloadService {
  private request$?: Observable<AppRelease>;

  constructor(private readonly http: HttpClient) {}

  getLatest(): Observable<AppRelease> {
    if (!this.request$) {
      this.request$ = this.load().pipe(shareReplay(1));
    }
    return this.request$;
  }

  private load(): Observable<AppRelease> {
    const cache = this.lerCache();
    if (cache) {
      return of(cache);
    }

    return this.http
      .get<GitHubRelease>(API_RELEASE, {
        headers: new HttpHeaders({ Accept: 'application/vnd.github+json' })
      })
      .pipe(
        map((release) => this.mapearRelease(release)),
        tap((release) => this.gravarCache(release)),
        catchError(() => of(this.fallback()))
      );
  }

  private mapearRelease(release: GitHubRelease): AppRelease {
    const apk = release.assets?.find((asset) =>
      asset.name.toLowerCase().endsWith('.apk')
    );

    return {
      version: (release.tag_name ?? '').replace(/^v/i, '') || null,
      apkUrl: apk?.browser_download_url ?? null,
      releaseUrl: release.html_url || PAGINA_RELEASES,
      sizeBytes: apk?.size ?? null,
      publishedAt: release.published_at || null
    };
  }

  private fallback(): AppRelease {
    return {
      version: null,
      apkUrl: null,
      releaseUrl: PAGINA_RELEASES,
      sizeBytes: null,
      publishedAt: null
    };
  }

  private lerCache(): AppRelease | null {
    try {
      const bruto = localStorage.getItem(CACHE_KEY);
      if (!bruto) {
        return null;
      }

      const salvo = JSON.parse(bruto) as { salvoEm: number; release: AppRelease };
      if (!salvo?.release || Date.now() - salvo.salvoEm > CACHE_TTL_MS) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      return salvo.release;
    } catch {
      return null;
    }
  }

  private gravarCache(release: AppRelease): void {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ salvoEm: Date.now(), release })
      );
    } catch {
      // Armazenamento indisponível (modo privado, por exemplo): ignora o cache.
    }
  }
}
