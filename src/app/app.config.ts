import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

// Import Lucide con nombres reales de la librería v0.477.0+
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  Video, 
  Heart, 
  Settings, 
  Search, 
  User, 
  Play, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  PanelLeftClose, 
  PanelLeftOpen, 
  CircleCheck, 
  Users, 
  BarChart3,
  Bell,
  BellOff,
  UserMinus,
  MessageSquare,
  Send,
  Smile,
  Share2,
  DollarSign,
  ExternalLink,
  Clock,
  Eye,
  ThumbsUp,
  Maximize,
  ArrowLeft,
  Gamepad2,
  Tags,
  PlayCircle,
  Flame,
  Gamepad
  } from 'lucide-angular';

  import { routes } from './app.routes';

  export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(), // Cambio de provideAnimationsAsync a provideAnimations por requerimiento
    provideHttpClient(),
    // Registro global optimizado
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard,
        Video,
        Heart,
        Settings,
        Search,
        User,
        Play,
        Menu,
        X,
        ChevronLeft,
        ChevronRight,
        LogOut,
        PanelLeftClose, 
        PanelLeftOpen, 
        CircleCheck, 
        Users, 
        BarChart3,
        Bell,
        BellOff,
        UserMinus,
        MessageSquare,
        Send,
        Smile,
        Share2,
        DollarSign,
        ExternalLink,
        Clock,
        Eye,
        ThumbsUp,
        Maximize,
        ArrowLeft,
        Gamepad2,
        Tags,
        PlayCircle,
        Flame,
        Gamepad
      })
    )
  ]
  };

