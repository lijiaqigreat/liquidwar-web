# Liquid War 6 is a unique multiplayer wargame.
# Copyright (C)  2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015  Christian Mauduit <ufoot@ufoot.org>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#
# Liquid War 6 homepage : http://www.gnu.org/software/liquidwar6/
# Contact author        : ufoot@ufoot.org

%define name liquidwar6
%define version 0.6.3902
%define release 0vendor

#Put this in /etc/rpm/macros.jenkins
#%_signature gpg
#%_gpg_path /var/lib/jenkins/.gnupg
#%_gpg_name Jenkins Daemon (Christian Mauduit) <jenkins@ufoot.org>
#%_gpgbin /usr/bin/gpg

## Uncomment these if complaints about unpackaged files
#%define _unpackaged_files_terminate_build 0
#%define _missing_doc_files_terminate_build 0

Summary: A unique multiplayer wargame.
Summary(fr): Un "wargame" multijoueur in�dit.
Summary(de): Ein einzigartiges Kriegspiel f�r mehrere Spieler.
Name: %{name}
Version: %{version}
Release: %{release}
License: GPLv3+
Group: Amusements/Games
Source: http://download.savannah.gnu.org/releases/liquidwar6/%{version}/%{name}-%{version}.tar.gz
URL: http://www.gnu.org/software/liquidwar6
Vendor: Christian Mauduit <ufoot@ufoot.org>
Packager: Christian Mauduit <ufoot@ufoot.org>
Requires: glibc
Requires: guile
Requires: gmp
Requires: zlib
Requires: expat
Requires: libpng
Requires: libjpeg
Requires: sqlite
Requires: ncurses
Requires: readline
Requires: gtk2
Requires: libGL
Requires: libGLU
Requires: SDL
Requires: SDL_image
Requires: SDL_mixer
Requires: freetype
Requires: SDL_ttf
Requires: libcurl
BuildRequires: make
BuildRequires: gcc
BuildRequires: glibc-devel
BuildRequires: binutils
BuildRequires: libgomp
BuildRequires: guile-devel
BuildRequires: gmp-devel
BuildRequires: libtool
BuildRequires: libtool-ltdl
BuildRequires: libtool-ltdl-devel
BuildRequires: zlib-devel
BuildRequires: expat-devel
BuildRequires: libpng-devel
BuildRequires: libjpeg-devel
BuildRequires: sqlite-devel
BuildRequires: ncurses-devel
BuildRequires: readline-devel
BuildRequires: gtk2-devel
BuildRequires: libGL-devel
BuildRequires: libGLU-devel
BuildRequires: SDL-devel
BuildRequires: SDL_image-devel
BuildRequires: SDL_mixer-devel
BuildRequires: freetype-devel
BuildRequires: SDL_ttf-devel
BuildRequires: libcurl-devel
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}

%description
Liquid War 6 is a unique multiplayer wargame. Your army is a blob of
liquid and you have to try and eat your opponents. Rules are very
simple yet original, they have been invented by Thomas Colcombet. It
is possible to play alone against the computer but the game is really
designed to be played with friends, on a single computer, on a LAN, or
on Internet.

%description -l fr
Liquid War 6 est un wargame multijoueurs unique en son genre. Votre
arm�e est une masse informe de liquide, et vous devez essayer de
manger votre adversaire. La r�gle est tr�s simple mais originale, elle
a �t� invent�e par Thomas Colcombet. Il est possible de jouer seul
contre un ordinateur mais le jeu est vraiment con�u pour �tre jou� �
plusieurs, sur une seule machine, sur un r�seau local, ou sur
Internet.

%description -l de
Liquid War 6 ist ein einzigartiges Kriegsspiel f�r mehrere Spieler. Die
Regeln sind wahrhaft neuartig und wurden von Thomas Colcombet entwickelt.
Man steuert eine fl�ssige Armee und muss versuchen die Gegner aufzufressen.
Es gibt einen Einzelspielermodus, aber das Spiel ist eindeutig auf mehrere
Spieler ausgelegt und unterst�tzt das Spielen �ber Netzwerk.

%description -l dk
Liquid war 6 er et unikt multiplayer krigsspil. Reglerne er
uhyre originale og er opfundet af Thomas Colcombet. Du styrer
en h�r af v�ske og skal pr�ve at �de dine modstandere.
Liquid War kan spilles alene, men er helt afgjort designet
til multiplayer, og har netv�rks-support.

# Preparation of the package
%prep
%setup
./configure --prefix=%{_prefix} --docdir=%{_prefix}/share/doc/liquidwar6-0.6 --infodir=%{_prefix}/info --enable-allinone --disable-mod-csound

# Building the package
%build
make 
cd doc; make liquidwar6.html liquidwar6.pdf

# Installing the package
%install
rm -rf %{buildroot}%{_prefix}/bin
rm -rf %{buildroot}%{_prefix}/share
rm -rf %{buildroot}%{_prefix}/info
export DESTDIR=%{buildroot} && make install 
cp ChangeLog README NEWS COPYING AUTHORS %{buildroot}%{_prefix}/share/doc/liquidwar6-0.6/
for i in %{buildroot}%{_prefix}/info/liquidwar6*info*; do gzip $i; done
# No devel stuff in this RPM
rm -rf %{buildroot}%{_prefix}/include
rm -rf %{buildroot}%{_prefix}/lib
rm -rf %{buildroot}%{_prefix}/libexec

# Cleaning
%clean
rm -rf %{buildroot}

# Pre-install script
%pre

# Post-install script
# Adds info page to Top info page directory.
%post
if which install-info && test -d %{_prefix}/info && test -f %{_prefix}/info/dir && test -f %{_prefix}/info/liquidwar6.info.gz ; then install-info --info-dir=%{_prefix}/info %{_prefix}/info/liquidwar6.info.gz; fi

# Pre-uninstall script
%preun

# Post-uninstall script
# Remove info page from Top info page directory.
%postun
if which install-info && test -d %{_prefix}/info && test -f %{_prefix}/info/dir; then install-info --info-dir=%{_prefix}/info --remove liquidwar6; fi

%files
%defattr(-,root,root)
%{_prefix}/bin/*
%{_prefix}/share/liquidwar6-0.6/*
%{_prefix}/share/locale/*/LC_MESSAGES/*
%{_prefix}/share/pixmaps/*
%{_prefix}/share/applications/*
%{_prefix}/info/*
%{_prefix}/share/man/man6/*
%{_prefix}/share/doc/liquidwar6-0.6/*

%changelog

* Tue Jun 25 2013 Christian Mauduit <ufoot@ufoot.org>
- Using major.minor.version as version number.

* Fri Oct 28 2011 Christian Mauduit <ufoot@ufoot.org>
- Fixed license and explicitly set it to GPLv3+ instead of GPL.

* Tue Oct 04 2011 Christian Mauduit <ufoot@ufoot.org>
- Fixed LC_MESSAGES handling (French only was handled)

* Sun Aug 28 2011 Christian Mauduit <ufoot@ufoot.org>
- Added libgomp build dependency.

* Fri Jul 23 2010 Christian Mauduit <ufoot@ufoot.org>
- Added GTK dependency.

* Fri Jul 09 2010 Christian Mauduit <ufoot@ufoot.org>
- Added applications directory (contains .desktop file).

* Tue Oct 20 2009 Christian Mauduit <ufoot@ufoot.org>
- Added proper GPG info.

* Mon Oct 05 2009 Christian Mauduit <ufoot@ufoot.org>
- Fixed info postinstall script.

* Tue Sep 09 2009 Christian Mauduit <ufoot@ufoot.org>
- Added Requires and BuildRequires declarations.

* Sat Jan 10 2009 Christian Mauduit <ufoot@ufoot.org>
- Fixed source URL.

* Thu Jan 08 2009 Christian Mauduit <ufoot@ufoot.org>
- Disabled csound support by default.
- Fixed info file handling.

* Wed Nov 07 2007 Christian Mauduit <ufoot@ufoot.org>
- Added version in data path.

* Mon Dec 18 2006 Christian Mauduit <ufoot@ufoot.org>
- Minor fixes, only a single jumbo binary is generated.

* Tue Dec 05 2006 Christian Mauduit <ufoot@ufoot.org> 
- First RPM, inspired from Liquid War 5

