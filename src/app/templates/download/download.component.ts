import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppDownloadService, AppRelease } from '../../core/services/app-download.service';

@Component({
  selector: 'app-download',
  standalone: false,
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {
  release: AppRelease | null = null;
  carregando = true;
  mostrarPopup = false;

  private popupTimer?: ReturnType<typeof setTimeout>;
  private readonly popupKey = 'karaoke.app.download.popup';

  constructor(private readonly appDownload: AppDownloadService) {}

  ngOnInit(): void {
    this.appDownload.getLatest().subscribe((release) => {
      this.release = release;
      this.carregando = false;
      this.agendarPopup();
    });
  }

  ngOnDestroy(): void {
    if (this.popupTimer) {
      clearTimeout(this.popupTimer);
    }
    this.travarScroll(false);
  }

  get destinoDownload(): string {
    return (
      this.release?.apkUrl ||
      this.release?.releaseUrl ||
      'https://github.com/ClaytonPrebelli/AppKaraokeSorocaba/releases/latest'
    );
  }

  get rotuloDownload(): string {
    if (this.carregando) {
      return 'Buscando versão...';
    }
    return this.release?.apkUrl ? 'Baixar APK' : 'Abrir downloads no GitHub';
  }

  get tamanhoFormatado(): string {
    const bytes = this.release?.sizeBytes;
    if (!bytes) {
      return '';
    }
    return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
  }

  get atualizadoEm(): string {
    const data = this.release?.publishedAt;
    if (!data) {
      return '';
    }
    return new Date(data).toLocaleDateString('pt-BR');
  }

  baixar(): void {
    const destino = this.destinoDownload;
    if (!destino) {
      return;
    }
    this.fecharPopup();
    window.location.href = destino;
  }

  fecharPopup(): void {
    this.marcarPopupVisto();
    this.mostrarPopup = false;
    this.travarScroll(false);
  }

  @HostListener('document:keydown.escape')
  aoPressionarEsc(): void {
    if (this.mostrarPopup) {
      this.fecharPopup();
    }
  }

  private agendarPopup(): void {
    if (this.popupJaVisto()) {
      return;
    }
    this.popupTimer = setTimeout(() => {
      this.mostrarPopup = true;
      this.travarScroll(true);
    }, 650);
  }

  private popupJaVisto(): boolean {
    try {
      return sessionStorage.getItem(this.popupKey) === '1';
    } catch {
      return false;
    }
  }

  private marcarPopupVisto(): void {
    try {
      sessionStorage.setItem(this.popupKey, '1');
    } catch {
      // Sem sessionStorage, o popup pode reaparecer ao recarregar a página.
    }
  }

  private travarScroll(travar: boolean): void {
    document.body.style.overflow = travar ? 'hidden' : '';
  }
}
